package pl.ug.edu.cmms;

import static org.junit.jupiter.api.Assertions.*;
import static pl.ug.edu.cmms.Machine.MachineType.CONVEYOR;
import static pl.ug.edu.cmms.WorkOrder.Priority.NORMAL;
import static pl.ug.edu.cmms.WorkOrder.WorkOrderStatus.*;
import static pl.ug.edu.cmms.WorkOrder.WorkOrderType.*;

import java.time.*;
import java.util.List;
import org.junit.jupiter.api.Test;

class ReportServiceTest {

    @Test
    void mttrIsAverageOfFinishedBreakdownsTruncatedToMinutes() {
        List<Machine> machines = List.of(new Machine("M-X", "Test", CONVEYOR, "X", LocalDate.parse("2020-01-01")));
        LocalDateTime t = LocalDateTime.parse("2026-01-01T08:00");
        List<WorkOrder> orders = List.of(
                new WorkOrder("WO-1", "M-X", BREAKDOWN, NORMAL, DONE, t, t.plusHours(1)),           
                new WorkOrder("WO-2", "M-X", BREAKDOWN, NORMAL, DONE, t, t.plusHours(2).plusMinutes(1)),
                new WorkOrder("WO-3", "M-X", BREAKDOWN, NORMAL, CANCELLED, t, null),                    
                new WorkOrder("WO-4", "M-X", PREVENTIVE, NORMAL, DONE, t, t.plusHours(10)));            

        Duration mttr = new ReportService().mttrByHall(machines, orders).get("X");

        assertEquals(Duration.ofMinutes(90), mttr);
        assertEquals("1 h 30 min", ReportService.formatHm(mttr));
    }
}