package pl.ug.edu.cmms;

import java.time.LocalDate;

public record Machine(String id, String name, MachineType type, String hall, LocalDate commissionedOn) {

    public enum MachineType {
        CNC_LATHE, CONVEYOR, MILLING_MACHINE, WELDING_ROBOT,
        INJECTION_MOLDER, HYDRAULIC_PRESS, COMPRESSOR
    }

    public Machine {
        if (id == null || id.isBlank()) throw new IllegalArgumentException("Machine id must not be blank");
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Machine name must not be blank");
        if (type == null) throw new IllegalArgumentException("Machine type is required");
        if (hall == null || hall.isBlank()) throw new IllegalArgumentException("Hall must not be blank");
        if (commissionedOn == null) throw new IllegalArgumentException("Commissioning date is required");
    }
}
