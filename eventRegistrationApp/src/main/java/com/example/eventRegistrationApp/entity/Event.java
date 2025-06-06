package com.example.eventRegistrationApp.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    private ObjectId id;

    public String getId() {
        return id != null ? id.toHexString() : null;
    }

    @NonNull
    private String eventName;

    @NonNull
    private String location;

    @NonNull
    private LocalDateTime date;

    private Integer maxParticipants;




}
