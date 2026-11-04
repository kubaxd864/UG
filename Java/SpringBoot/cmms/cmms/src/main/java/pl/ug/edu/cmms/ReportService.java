package pl.ug.edu.cmms;

import java.time.Duration;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import pl.ug.edu.cmms.WorkOrder.Priority;
import pl.ug.edu.cmms.WorkOrder.WorkOrderStatus;
import pl.ug.edu.cmms.WorkOrder.WorkOrderType;

@Service
public class ReportService {
    public Map<Priority, Long> unfinishedByPriority(List<WorkOrder> orders) {
        Map<Priority, Long> result = new EnumMap<>(Priority.class);
        for (Priority p : Priority.values()) result.put(p, 0L);
        orders.stream()
                .filter(o -> o.status() == WorkOrderStatus.OPEN || o.status() == WorkOrderStatus.IN_PROGRESS)
                .forEach(o -> result.merge(o.priority(), 1L, Long::sum));
        return result;
    }

    public List<Map.Entry<String, Long>> topBreakdownMachines(List<WorkOrder> orders, int limit) {
        return orders.stream()
                .filter(o -> o.type() == WorkOrderType.BREAKDOWN && o.status() != WorkOrderStatus.CANCELLED)
                .collect(Collectors.groupingBy(WorkOrder::machineId, Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed()
                        .thenComparing(Map.Entry.comparingByKey()))
                .limit(limit)
                .toList();
    }

    public Map<String, Duration> mttrByHall(List<Machine> machines, List<WorkOrder> orders) {
        Map<String, String> hallOf = machines.stream()
                .collect(Collectors.toMap(Machine::id, Machine::hall));
        Map<String, List<Duration>> durations = new TreeMap<>();
        for (WorkOrder o : orders) {
            if (o.type() == WorkOrderType.BREAKDOWN && o.status() == WorkOrderStatus.DONE) {
                durations.computeIfAbsent(hallOf.get(o.machineId()), h -> new ArrayList<>())
                        .add(Duration.between(o.reportedAt(), o.closedAt()));
            }
        }
        Map<String, Duration> result = new TreeMap<>();
        durations.forEach((hall, list) -> {
            Duration total = list.stream().reduce(Duration.ZERO, Duration::plus);
            Duration avg = total.dividedBy(list.size());
            result.put(hall, Duration.ofMinutes(avg.toMinutes()));
        });
        return result;
    }

    public static String formatHm(Duration d) {
        return d.toHours() + " h " + d.toMinutesPart() + " min";
    }
}