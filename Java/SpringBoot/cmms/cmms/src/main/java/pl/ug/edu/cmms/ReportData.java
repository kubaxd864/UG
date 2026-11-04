package pl.ug.edu.cmms;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import pl.ug.edu.cmms.WorkOrder.Priority;

public record ReportData(int machineCount, int orderCount,
                         Map<Priority, Long> unfinishedByPriority,
                         List<MachineBreakdowns> topMachines,
                         Map<String, Duration> mttrByHall) {

    public record MachineBreakdowns(String id, long breakdowns) { }
}