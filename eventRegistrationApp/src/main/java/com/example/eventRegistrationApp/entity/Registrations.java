package com.example.eventRegistrationApp.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "registrations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registrations {

    @Id
    private ObjectId id;

    public String getId() {
        return id != null ? id.toHexString() : null;
    }

    @DBRef
    private User user;

    @DBRef
    private Event event;

    public enum Status {
        APPROVED,
        PENDING,
        REJECTED
    }

    @Builder.Default
    private Status status = Status.PENDING;

}
