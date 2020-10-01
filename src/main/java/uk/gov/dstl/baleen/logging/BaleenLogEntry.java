package uk.gov.dstl.baleen.logging;

/*-
 * #%L
 * Baleen 3
 * %%
 * Copyright (C) 2020 Dstl
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */

import io.swagger.v3.oas.annotations.media.Schema;
import org.slf4j.event.Level;
import org.slf4j.helpers.FormattingTuple;

import javax.annotation.Nullable;
import java.time.LocalDateTime;

/**
 * Data class to hold information about a log entry
 */
@Schema(name = "Baleen Log Entry", description = "Log entry captured by Baleen from Annot8")
public class BaleenLogEntry {
  private final Level level;
  private final String message;
  private final String name;
  private final LocalDateTime timestamp;
  @Nullable
  private final Throwable throwable;

  public BaleenLogEntry(Level level, FormattingTuple formattingTuple, String name) {
    this.level = level;
    this.message = formattingTuple.getMessage();
    this.name = name;
    this.timestamp = LocalDateTime.now();
    this.throwable = formattingTuple.getThrowable();
  }

  public BaleenLogEntry(Level level, String message, String name) {
    this.level = level;
    this.message = message;
    this.name = name;
    this.timestamp = LocalDateTime.now();
    this.throwable = null;
  }

  public BaleenLogEntry(Level level, String message, Throwable throwable, String name) {
    this.level = level;
    this.message = message;
    this.name = name;
    this.timestamp = LocalDateTime.now();
    this.throwable = throwable;
  }

  @Schema(
      description = "Priority level associated with this log message")
  public Level getLevel() {
    return level;
  }

  @Schema(description = "Log message")
  public String getMessage() {
    return message;
  }

  @Schema(description = "Name of the class that produced this log message")
  public String getName() {
    return name;
  }

  @Schema(description = "Timestamp at which this log message was created")
  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  @Schema(description = "Any Throwable (stack trace) associated with this message, may be empty")
  public Throwable getThrowable() {
    return throwable;
  }
}
