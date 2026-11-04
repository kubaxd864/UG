package pl.ug.edu.cmms;

import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ReportRunner implements CommandLineRunner {

    private final ReportService reports;

    public ReportRunner(ReportService reports) { this.reports = reports; }

    @Override
    public void run(String... args) {
        List<Machine> machines = SampleData.machines();
        List<WorkOrder> orders = SampleData.workOrders();

        System.out.println("Niezakończone zlecenia wg priorytetu:");
        reports.unfinishedByPriority(orders).forEach((p, n) -> System.out.println("  " + p + ": " + n));

        System.out.println("Top 3 maszyny wg liczby awarii:");
        reports.topBreakdownMachines(orders, 3)
                .forEach(e -> System.out.println("  " + e.getKey() + ": " + e.getValue()));

        System.out.println("MTTR hal:");
        reports.mttrByHall(machines, orders)
                .forEach((hall, d) -> System.out.println("  Hala " + hall + ": " + ReportService.formatHm(d)));
    }
}