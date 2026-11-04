package pl.ug.edu.cmms;

import java.util.List;
import java.nio.file.Path;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class ReportRunner implements CommandLineRunner {

    private final List<Machine> machines;
    private final List<WorkOrder> orders;
    private final ReportService reports;
    private final Path reportFile;

    public ReportRunner(@Qualifier("machines") List<Machine> machines,
                        @Qualifier("workOrders") List<WorkOrder> orders,
                        ReportService reports,
                        @Value("${report.file}") String reportFile) {
        this.machines = machines;
        this.orders = orders;
        this.reports = reports;
        this.reportFile = Path.of(reportFile);
    }

    @Override
    public void run(String... args) throws Exception {
        ReportData data = reports.build(machines, orders);

        System.out.println("Niezakończone zlecenia wg priorytetu:");
        data.unfinishedByPriority().forEach((p, n) -> System.out.println("  " + p + ": " + n));

        System.out.println("Top maszyny wg liczby awarii:");
        data.topMachines().forEach(e ->
                System.out.println("  " + e.id() + ": " + e.breakdowns()));

        System.out.println("MTTR hal:");
        data.mttrByHall().forEach((hall, d) ->
                System.out.println("  Hala " + hall + ": " + ReportService.formatHm(d)));
        ReportXml.write(data, reportFile);
    }
}