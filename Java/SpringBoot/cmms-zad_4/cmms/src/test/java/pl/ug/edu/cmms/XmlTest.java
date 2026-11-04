package pl.ug.edu.cmms;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.file.Path;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

class XmlTest {

    @TempDir
    Path tmp;

    @Test
    void reportRoundTrip() throws Exception {
        Path file = tmp.resolve("nowy/katalog/report.xml");
        ReportData original = new ReportService(3)
                .build(SampleData.machines(), SampleData.workOrders());

        ReportXml.write(original, file);

        assertTrue(file.toFile().isFile());
        assertEquals(original, ReportXml.read(file));
    }
}
