package com.brentvatne.exoplayer;

import java.util.ArrayList;
import java.util.List;

public class TrackingActionEventObj {
    private List<String> beaconUrls = new ArrayList<String>();
    private String eventType;
    private Double time;
    private Double start;
    private Double end;
    private Double duration;
    private Double skipOffset;
    private String eventId;

    public List<String> getBeaconUrls() {
        return beaconUrls;
    }
    public void setBeaconUrls(List<String> beaconUrls) {
        this.beaconUrls = beaconUrls;
    }

    public String getEventType() {
        return eventType;
    }
    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public Double getDuration() {
        return duration;
    }
    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public Double getTime() {
        return time;
    }
    public void setTime(Double time) {
        this.time = time;
    }

    public Double getStart() {
        return start;
    }
    public void setStart(Double start) {
        this.start = start;
    }

    public Double getEnd() {
        return end;
    }
    public void setEnd(Double end) {
        this.end = end;
    }

    public Double getSkipOffset() {
        return skipOffset;
    }
    public void setSkipOffset(Double skipOffset) {
        this.skipOffset = skipOffset;
    }

    public String getEventId() {
        return eventId;
    }
    public void setEventId(String eventId) {
        this.eventId = eventId;
    }
    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "TrackingActionEventObj [beaconUrls=" + beaconUrls +  ", duration=" + duration + ", time=" + time + ", eventType=" + eventType + ", start=" + start + ", end=" + end + ", skipOffset=" + skipOffset + ", eventId=" + eventId + "]";
    }
}