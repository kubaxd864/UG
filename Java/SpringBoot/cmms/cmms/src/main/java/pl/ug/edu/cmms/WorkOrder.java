package pl.ug.edu.cmms;

import java.time.LocalDateTime;

public record WorkOrder(String id, String machineId, WorkOrderType type, Priority priority,
                        WorkOrderStatus status, LocalDateTime reportedAt, LocalDateTime closedAt) {

    public enum WorkOrderType { PREVENTIVE, INSPECTION, BREAKDOWN }
    public enum Priority { LOW, NORMAL, HIGH, CRITICAL }
    public enum WorkOrderStatus { OPEN, IN_PROGRESS, DONE, CANCELLED }

    public WorkOrder {
        if (id == null || id.isBlank()) throw new IllegalArgumentException("Work order id must not be blank");
        if (machineId == null || machineId.isBlank()) throw new IllegalArgumentException("Machine id must not be blank");
        if (type == null || priority == null || status == null)
            throw new IllegalArgumentException("Type, priority and status are required");
        if (reportedAt == null) throw new IllegalArgumentException("Report date is required");
        if (status == WorkOrderStatus.DONE && closedAt == null)
            throw new IllegalArgumentException("DONE work order requires a closing date");
        if (closedAt != null && closedAt.isBefore(reportedAt))
            throw new IllegalArgumentException("Closing date must not be before report date");
    }
}