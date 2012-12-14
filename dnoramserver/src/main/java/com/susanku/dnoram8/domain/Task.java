package com.susanku.dnoram8.domain;

import java.util.Date;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
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

    @NotNull
    private String addressType;

    private String formattedAddress;

    @ManyToOne
    private Duser duser_id;

    @Transient
    private int drivingTime;

    @Transient
    private int totalTaskTime;

    @Transient
    private double drivingDistance;

    @Transient
    private String drivingDistanceText;

    @Transient
    private String drivingTimeText;

    @Transient
    private Boolean updated;

    private String notes;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "M-")
    private Date createdOn;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "M-")
    private Date updatedOn;

    public Boolean getUpdated() {
        return Boolean.TRUE;
    }
}
