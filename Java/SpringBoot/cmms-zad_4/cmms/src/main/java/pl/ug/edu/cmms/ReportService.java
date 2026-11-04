package pl.ug.edu.cmms;

import java.time.Clock;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import pl.ug.edu.cmms.ReportData.MachineBreakdowns;
import pl.ug.edu.cmms.WorkOrder.Priority;
import pl.ug.edu.cmms.WorkOrder.WorkOrderStatus;
import pl.ug.edu.cmms.WorkOrder.WorkOrderType;

public class ReportService {

    private final int topN;
    private final Clock clock;
    private final SlaProperties sla;

    public ReportService() {
        this(3, new SlaProperties(Duration.ofHours(4), Duration.ofHours(16),
                Duration.ofHours(36), Duration.ofHours(264)), Clock.systemDefaultZone());
    }

    public ReportService(int topN) {
        this(topN, new SlaProperties(Duration.ofHours(4), Duration.ofHours(16),
                Duration.ofHours(36), Duration.ofHours(264)), Clock.systemDefaultZone());
    }

    public ReportService(int topN, SlaProperties sla, Clock clock) {
        this.topN = topN;
        this.sla = sla;
        this.clock = clock;
    }

    public ReportData build(List<Machine> machines, List<WorkOrder> orders) {
        return new ReportData(machines.size(), orders.size(),
                unfinishedByPriority(orders), topBreakdowns(orders), mttrByHall(machines, orders));
    }

    private Map<Priority, Long> unfinishedByPriority(List<WorkOrder> orders) {
        Map<Priority, Long> result = new EnumMap<>(Priority.class);
        for (Priority p : Priority.values()) result.put(p, 0L);
        orders.stream()
                .filter(o -> o.status() == WorkOrderStatus.OPEN || o.status() == WorkOrderStatus.IN_PROGRESS)
                .forEach(o -> result.merge(o.priority(), 1L, Long::sum));
        return result;
    }

    private List<MachineBreakdowns> topBreakdowns(List<WorkOrder> orders) {
        return orders.stream()
                .filter(o -> o.type() == WorkOrderType.BREAKDOWN && o.status() != WorkOrderStatus.CANCELLED)
                .collect(Collectors.groupingBy(WorkOrder::machineId, Collectors.counting()))
                .entrySet().stream()
                .map(e -> new MachineBreakdowns(e.getKey(), e.getValue()))
                .sorted(Comparator.comparingLong(MachineBreakdowns::breakdowns).reversed()
                        .thenComparing(MachineBreakdowns::id))
                .limit(topN)
                .toList();
    }

    public Map<String, Duration> mttrByHall(List<Machine> machines, List<WorkOrder> orders) {
        Map<String, String> hallOf = machines.stream().collect(Collectors.toMap(Machine::id, Machine::hall));
        Map<String, List<Duration>> durations = new TreeMap<>();
        for (WorkOrder o : orders) {
            if (o.type() == WorkOrderType.BREAKDOWN && o.status() == WorkOrderStatus.DONE) {
                durations.computeIfAbsent(hallOf.get(o.machineId()), h -> new ArrayList<>())
                        .add(Duration.between(o.reportedAt(), o.closedAt()));
            }
        }
        Map<String, Duration> result = new TreeMap<>();
        durations.forEach((hall, list) -> {
            Duration avg = list.stream().reduce(Duration.ZERO, Duration::plus).dividedBy(list.size());
            result.put(hall, Duration.ofMinutes(avg.toMinutes()));  
        });
        return result;
    }
    
    public Map<Priority, Long> finishedBreakdownsOverLimits(List<WorkOrder> orders) {
        Map<Priority, Long> result = new EnumMap<>(Priority.class);
        for (Priority priority : Priority.values()) {
            result.put(priority, 0L);
        }
        orders.stream()
                .filter(o -> o.type() == WorkOrderType.BREAKDOWN && o.status() == WorkOrderStatus.DONE)
                .filter(o -> Duration.between(o.reportedAt(), o.closedAt()).compareTo(limitFor(o.priority())) > 0)
                .forEach(o -> result.merge(o.priority(), 1L, Long::sum));
        return result;
    }

    public List<WorkOrder> overdueOpenOrders(List<WorkOrder> orders) {
        LocalDateTime now = LocalDateTime.now(clock);
        return orders.stream()
                .filter(o -> o.status() == WorkOrderStatus.OPEN || o.status() == WorkOrderStatus.IN_PROGRESS)
                .filter(o -> Duration.between(o.reportedAt(), now).compareTo(limitFor(o.priority())) > 0)
                .toList();
    }

    private Duration limitFor(Priority priority) {
        return switch (priority) {
            case CRITICAL -> sla.critical();
            case HIGH -> sla.high();
            case NORMAL -> sla.normal();
            case LOW -> sla.low();
        };
    }

    public static String formatHm(Duration d) {
        return d.toHours() + " h " + d.toMinutesPart() + " min";
    }
}