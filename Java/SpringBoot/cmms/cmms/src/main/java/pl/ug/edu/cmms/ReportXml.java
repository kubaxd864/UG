package pl.ug.edu.cmms;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import tools.jackson.databind.SerializationFeature;
import tools.jackson.dataformat.xml.XmlMapper;
import tools.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import tools.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import tools.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import pl.ug.edu.cmms.ReportData.MachineBreakdowns;
import pl.ug.edu.cmms.WorkOrder.Priority;

public final class ReportXml {

    private static final XmlMapper XML = XmlMapper.builder()
            .enable(SerializationFeature.INDENT_OUTPUT)
            .build();

    private ReportXml() {
    }

    public static void write(ReportData report, Path file) throws IOException {
        Path parent = file.toAbsolutePath().normalize().getParent();
        if (parent != null) {
            Files.createDirectories(parent);
        }
        Files.writeString(file, XML.writeValueAsString(XmlReport.from(report)));
    }

    public static ReportData read(Path file) throws IOException {
        return XML.readValue(Files.readString(file), XmlReport.class).toReportData();
    }

    @JacksonXmlRootElement(localName = "report")
    private record XmlReport(
            int machineCount,
            int orderCount,
            UnfinishedByPriority unfinishedByPriority,
            TopBreakdowns topBreakdowns,
            MttrByHall mttrByHall) {

        private static XmlReport from(ReportData report) {
            List<PriorityEntry> priorities = report.unfinishedByPriority().entrySet().stream()
                    .map(entry -> new PriorityEntry(entry.getKey().name(), entry.getValue()))
                    .toList();
            List<MachineEntry> machines = report.topMachines().stream()
                    .map(machine -> new MachineEntry(machine.id(), machine.breakdowns()))
                    .toList();
            List<HallEntry> halls = report.mttrByHall().entrySet().stream()
                    .map(entry -> new HallEntry(entry.getKey(), entry.getValue().toMinutes()))
                    .toList();
            return new XmlReport(report.machineCount(), report.orderCount(),
                    new UnfinishedByPriority(priorities),
                    new TopBreakdowns(machines),
                    new MttrByHall(halls));
        }

        private ReportData toReportData() {
            Map<Priority, Long> priorities = new EnumMap<>(Priority.class);
            unfinishedByPriority.priority().forEach(entry ->
                    priorities.put(Priority.valueOf(entry.name()), entry.count()));

            List<MachineBreakdowns> machines = topBreakdowns.machine().stream()
                    .map(entry -> new MachineBreakdowns(entry.id(), entry.breakdowns()))
                    .toList();

            Map<String, Duration> halls = new TreeMap<>();
            mttrByHall.hall().forEach(entry ->
                    halls.put(entry.name(), Duration.ofMinutes(entry.minutes())));

            return new ReportData(machineCount, orderCount, priorities, machines, halls);
        }
    }

    private record UnfinishedByPriority(
            @JacksonXmlElementWrapper(useWrapping = false)
            @JacksonXmlProperty(localName = "priority")
            List<PriorityEntry> priority) {
    }

    private record PriorityEntry(
            @JacksonXmlProperty(isAttribute = true)
            String name,
            long count) {
    }

    private record TopBreakdowns(
            @JacksonXmlElementWrapper(useWrapping = false)
            @JacksonXmlProperty(localName = "machine")
            List<MachineEntry> machine) {
    }

    private record MachineEntry(
            @JacksonXmlProperty(isAttribute = true)
            String id,
            @JacksonXmlProperty(isAttribute = true)
            long breakdowns) {
    }

    private record MttrByHall(
            @JacksonXmlElementWrapper(useWrapping = false)
            @JacksonXmlProperty(localName = "hall")
            List<HallEntry> hall) {
    }

    private record HallEntry(
            @JacksonXmlProperty(isAttribute = true)
            String name,
            long minutes) {
    }
}
