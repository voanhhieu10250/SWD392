package com.example.backend.entity;

import com.example.backend.entity.enums.ReportStatus;
import com.example.backend.entity.utils.TimeAuditable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Report extends TimeAuditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private User reporter;

    @ManyToOne
    private User reported;

    @ManyToOne
    private Art art;

    private String description;

    @Enumerated(EnumType.STRING)
    private ReportStatus status;

    @ManyToOne
    private Staff resolverStaff;
}
