package pl.ug.edu.cmms;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CmmsConfiguration {

    @Bean("machines")
    List<Machine> machines() {
        return SampleData.machines();
    }

    @Bean("workOrders")
    List<WorkOrder> workOrders() {
        return SampleData.workOrders();
    }

    @Bean
    ReportService reportService(@Value("${report.top-n}") int topN,
                                SlaProperties slaProperties,
                                java.time.Clock clock) {
        return new ReportService(topN, slaProperties, clock);
    }
}
