package com.susanku.dnoram8.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJson
@RooJpaActiveRecord(finders = { "findDusersByUseridEquals" })
public class Duser {

    private String userid;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "duser_id")
    private Set<Task> tasks = new HashSet<Task>();
}
