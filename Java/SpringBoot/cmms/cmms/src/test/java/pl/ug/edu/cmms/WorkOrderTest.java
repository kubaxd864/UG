package pl.ug.edu.cmms;

import static org.junit.jupiter.api.Assertions.*;
import static pl.ug.edu.cmms.WorkOrder.Priority.NORMAL;
import static pl.ug.edu.cmms.WorkOrder.WorkOrderStatus.*;
import static pl.ug.edu.cmms.WorkOrder.WorkOrderType.BREAKDOWN;

import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;

class WorkOrderTest {
    private static final LocalDateTime T = LocalDateTime.parse("2026-01-01T10:00");

    @Test void blankIdRejected() {
        assertThrows(IllegalArgumentException.class,
                () -> new WorkOrder(" ", "M-01", BREAKDOWN, NORMAL, OPEN, T, null));
    }
    @Test void doneWithoutClosedAtRejected() {
        assertThrows(IllegalArgumentException.class,
                () -> new WorkOrder("WO-1", "M-01", BREAKDOWN, NORMAL, DONE, T, null));
    }
    @Test void closedBeforeReportedRejected() {
        assertThrows(IllegalArgumentException.class,
                () -> new WorkOrder("WO-1", "M-01", BREAKDOWN, NORMAL, DONE, T, T.minusMinutes(1)));
    }
    @Test void validOrderCreated() {
        assertDoesNotThrow(() -> new WorkOrder("WO-1", "M-01", BREAKDOWN, NORMAL, DONE, T, T.plusHours(1)));
        assertDoesNotThrow(() -> new WorkOrder("WO-2", "M-01", BREAKDOWN, NORMAL, OPEN, T, null));
    }
}