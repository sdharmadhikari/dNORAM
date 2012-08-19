package com.susanku.dnoram8.domain;

import javax.persistence.ManyToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJson
@RooJpaActiveRecord(finders = { "findTasksByIdEquals", "findTasksByDuser_idAndIsCompletedNot" })
public class Task {

    private String id;

    private String title;

    private int duration;

    private String category;

    private String address;

    private Boolean isCompleted;

    @ManyToOne
    private Duser duser_id;

    @Transient
    private int drivingTime;

    @Transient
    private int totalTaskTime;

    @Transient
    private double drivingDistance;

    @NotNull
    private String addressType;
}
