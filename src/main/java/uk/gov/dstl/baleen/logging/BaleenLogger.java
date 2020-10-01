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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.event.Level;
import org.slf4j.helpers.FormattingTuple;
import org.slf4j.helpers.MessageFormatter;

import java.util.Collection;

/**
 * SLF4J Logger implementation for Baleen, which uses an in-memory collection
 * to store {@link BaleenLogEntry} instances.
 */
public class BaleenLogger implements Logger {

  private final String name;
  private final Logger logger;

  private final Collection<BaleenLogEntry> logEntries;

  public BaleenLogger(String name, Collection<BaleenLogEntry> logEntries) {
    this.name = name;
    this.logger = LoggerFactory.getLogger(name);
    this.logEntries = logEntries;
  }

  @Override
  public String getName() {
    return name;
  }

  @Override
  public boolean isTraceEnabled() {
    return logger.isTraceEnabled();
  }

  @Override
  public void trace(String msg) {
    if (isTraceEnabled()) {
      logger.trace(msg);
      logEntries.add(new BaleenLogEntry(Level.TRACE, msg, name));
    }
  }

  @Override
  public void trace(String format, Object arg) {
    if (isTraceEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg);

      logger.trace(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.TRACE, ft, name));
    }
  }

  @Override
  public void trace(String format, Object arg1, Object arg2) {
    if (isTraceEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg1, arg2);

      logger.trace(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.TRACE, ft, name));
    }
  }

  @Override
  public void trace(String format, Object... arguments) {
    if (isTraceEnabled()) {
      FormattingTuple ft = MessageFormatter.arrayFormat(format, arguments);

      logger.trace(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.TRACE, ft, name));
    }
  }

  @Override
  public void trace(String msg, Throwable t) {
    if (isTraceEnabled()) {
      logger.trace(msg, t);
      logEntries.add(new BaleenLogEntry(Level.TRACE, msg, t, name));
    }
  }

  @Override
  public boolean isTraceEnabled(Marker marker) {
    return logger.isTraceEnabled(marker);
  }

  @Override
  public void trace(Marker marker, String msg) {
    if (isTraceEnabled(marker)) {
      logger.trace(marker, msg);
      logEntries.add(new BaleenLogEntry(Level.TRACE, msg, name));
    }
  }

  @Override
  public void trace(Marker marker, String format, Object arg) {
    if (isTraceEnabled(marker)) {
      FormattingTuple ft = MessageFormatter.format(format, arg);

      logger.trace(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.TRACE, ft, name));
    }
  }

  @Override
  public void trace(Marker marker, String format, Object arg1, Object arg2) {
    if (isTraceEnabled(marker)) {
      FormattingTuple ft = MessageFormatter.format(format, arg1, arg2);

      logger.trace(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.TRACE, ft, name));
    }
  }

  @Override
  public void trace(Marker marker, String format, Object... arguments) {
    if (isTraceEnabled(marker)) {
      FormattingTuple ft = MessageFormatter.arrayFormat(format, arguments);

      logger.trace(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.TRACE, ft, name));
    }
  }

  @Override
  public void trace(Marker marker, String msg, Throwable t) {
    if (isTraceEnabled(marker)) {
      logger.trace(marker, msg);
      logEntries.add(new BaleenLogEntry(Level.TRACE, msg, t, name));
    }
  }

  @Override
  public boolean isDebugEnabled() {
    return logger.isDebugEnabled();
  }

  @Override
  public void debug(String msg) {
    if (isDebugEnabled()) {
      logger.debug(msg);
      logEntries.add(new BaleenLogEntry(Level.DEBUG, msg, name));
    }
  }

  @Override
  public void debug(String format, Object arg) {
    if (isDebugEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg);

      logger.debug(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.DEBUG, ft, name));
    }
  }

  @Override
  public void debug(String format, Object arg1, Object arg2) {
    if (isDebugEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg1, arg2);

      logger.debug(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.DEBUG, ft, name));
    }
  }

  @Override
  public void debug(String format, Object... arguments) {
    if (isDebugEnabled()) {
      FormattingTuple ft = MessageFormatter.arrayFormat(format, arguments);

      logger.debug(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.DEBUG, ft, name));
    }
  }

  @Override
  public void debug(String msg, Throwable t) {
    if (isDebugEnabled()) {
      logger.debug(msg, t);
      logEntries.add(new BaleenLogEntry(Level.DEBUG, msg, t, name));
    }
  }

  @Override
  public boolean isDebugEnabled(Marker marker) {
    return logger.isDebugEnabled(marker);
  }

  @Override
  public void debug(Marker marker, String msg) {
    if (isDebugEnabled()) {
      logger.debug(marker, msg);
      logEntries.add(new BaleenLogEntry(Level.DEBUG, msg, name));
    }
  }

  @Override
  public void debug(Marker marker, String format, Object arg) {
    if (isDebugEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg);

      logger.debug(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.DEBUG, ft, name));
    }
  }

  @Override
  public void debug(Marker marker, String format, Object arg1, Object arg2) {
    if (isDebugEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg1, arg2);

      logger.debug(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.DEBUG, ft, name));
    }
  }

  @Override
  public void debug(Marker marker, String format, Object... arguments) {
    if (isDebugEnabled()) {
      FormattingTuple ft = MessageFormatter.arrayFormat(format, arguments);

      logger.debug(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.DEBUG, ft, name));
    }
  }

  @Override
  public void debug(Marker marker, String msg, Throwable t) {
    if (isDebugEnabled()) {
      logger.debug(marker, msg, t);
      logEntries.add(new BaleenLogEntry(Level.DEBUG, msg, t, name));
    }
  }

  @Override
  public boolean isInfoEnabled() {
    return logger.isInfoEnabled();
  }

  @Override
  public void info(String msg) {
    if (isInfoEnabled()) {
      logger.info(msg);
      logEntries.add(new BaleenLogEntry(Level.INFO, msg, name));
    }
  }

  @Override
  public void info(String format, Object arg) {
    if (isInfoEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg);

      logger.info(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.INFO, ft, name));
    }
  }

  @Override
  public void info(String format, Object arg1, Object arg2) {
    if (isInfoEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg1, arg2);

      logger.info(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.INFO, ft, name));
    }
  }

  @Override
  public void info(String format, Object... arguments) {
    if (isInfoEnabled()) {
      FormattingTuple ft = MessageFormatter.arrayFormat(format, arguments);

      logger.info(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.INFO, ft, name));
    }
  }

  @Override
  public void info(String msg, Throwable t) {
    if (isInfoEnabled()) {
      logger.info(msg, t);
      logEntries.add(new BaleenLogEntry(Level.INFO, msg, t, name));
    }
  }

  @Override
  public boolean isInfoEnabled(Marker marker) {
    return logger.isInfoEnabled(marker);
  }

  @Override
  public void info(Marker marker, String msg) {
    if (isInfoEnabled()) {
      logger.info(marker, msg);
      logEntries.add(new BaleenLogEntry(Level.INFO, msg, name));
    }
  }

  @Override
  public void info(Marker marker, String format, Object arg) {
    if (isInfoEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg);

      logger.info(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.INFO, ft, name));
    }
  }

  @Override
  public void info(Marker marker, String format, Object arg1, Object arg2) {
    if (isInfoEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg1, arg2);

      logger.info(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.INFO, ft, name));
    }
  }

  @Override
  public void info(Marker marker, String format, Object... arguments) {
    if (isInfoEnabled()) {
      FormattingTuple ft = MessageFormatter.arrayFormat(format, arguments);

      logger.info(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.INFO, ft, name));
    }
  }

  @Override
  public void info(Marker marker, String msg, Throwable t) {
    if (isInfoEnabled()) {
      logger.info(marker, msg, t);
      logEntries.add(new BaleenLogEntry(Level.INFO, msg, t, name));
    }
  }

  @Override
  public boolean isWarnEnabled() {
    return logger.isWarnEnabled();
  }

  @Override
  public void warn(String msg) {
    if (isWarnEnabled()) {
      logger.warn(msg);
      logEntries.add(new BaleenLogEntry(Level.WARN, msg, name));
    }
  }

  @Override
  public void warn(String format, Object arg) {
    if (isWarnEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg);

      logger.warn(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.WARN, ft, name));
    }
  }

  @Override
  public void warn(String format, Object arg1, Object arg2) {
    if (isWarnEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg1, arg2);

      logger.warn(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.WARN, ft, name));
    }
  }

  @Override
  public void warn(String format, Object... arguments) {
    if (isWarnEnabled()) {
      FormattingTuple ft = MessageFormatter.arrayFormat(format, arguments);

      logger.warn(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.WARN, ft, name));
    }
  }

  @Override
  public void warn(String msg, Throwable t) {
    if (isWarnEnabled()) {
      logger.warn(msg, t);
      logEntries.add(new BaleenLogEntry(Level.WARN, msg, t, name));
    }
  }

  @Override
  public boolean isWarnEnabled(Marker marker) {
    return logger.isWarnEnabled(marker);
  }

  @Override
  public void warn(Marker marker, String msg) {
    if (isWarnEnabled()) {
      logger.warn(marker, msg);
      logEntries.add(new BaleenLogEntry(Level.WARN, msg, name));
    }
  }

  @Override
  public void warn(Marker marker, String format, Object arg) {
    if (isWarnEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg);

      logger.warn(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.WARN, ft, name));
    }
  }

  @Override
  public void warn(Marker marker, String format, Object arg1, Object arg2) {
    if (isWarnEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg1, arg2);

      logger.warn(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.WARN, ft, name));
    }
  }

  @Override
  public void warn(Marker marker, String format, Object... arguments) {
    if (isWarnEnabled()) {
      FormattingTuple ft = MessageFormatter.arrayFormat(format, arguments);

      logger.warn(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.WARN, ft, name));
    }
  }

  @Override
  public void warn(Marker marker, String msg, Throwable t) {
    if (isWarnEnabled()) {
      logger.warn(marker, msg, t);
      logEntries.add(new BaleenLogEntry(Level.WARN, msg, t, name));
    }
  }

  @Override
  public boolean isErrorEnabled() {
    return logger.isErrorEnabled();
  }

  @Override
  public void error(String msg) {
    if (isErrorEnabled()) {
      logger.error(msg);
      logEntries.add(new BaleenLogEntry(Level.ERROR, msg, name));
    }
  }

  @Override
  public void error(String format, Object arg) {
    if (isErrorEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg);

      logger.error(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.ERROR, ft, name));
    }
  }

  @Override
  public void error(String format, Object arg1, Object arg2) {
    if (isErrorEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg1, arg2);

      logger.error(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.ERROR, ft, name));
    }
  }

  @Override
  public void error(String format, Object... arguments) {
    if (isErrorEnabled()) {
      FormattingTuple ft = MessageFormatter.arrayFormat(format, arguments);

      logger.error(ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.ERROR, ft, name));
    }
  }

  @Override
  public void error(String msg, Throwable t) {
    if (isErrorEnabled()) {
      logger.error(msg, t);
      logEntries.add(new BaleenLogEntry(Level.ERROR, msg, t, name));
    }
  }

  @Override
  public boolean isErrorEnabled(Marker marker) {
    return logger.isErrorEnabled(marker);
  }

  @Override
  public void error(Marker marker, String msg) {
    if (isErrorEnabled()) {
      logger.error(marker, msg);
      logEntries.add(new BaleenLogEntry(Level.ERROR, msg, name));
    }
  }

  @Override
  public void error(Marker marker, String format, Object arg) {
    if (isErrorEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg);

      logger.error(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.ERROR, ft, name));
    }
  }

  @Override
  public void error(Marker marker, String format, Object arg1, Object arg2) {
    if (isErrorEnabled()) {
      FormattingTuple ft = MessageFormatter.format(format, arg1, arg2);

      logger.error(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.ERROR, ft, name));
    }
  }

  @Override
  public void error(Marker marker, String format, Object... arguments) {
    if (isErrorEnabled()) {
      FormattingTuple ft = MessageFormatter.arrayFormat(format, arguments);

      logger.error(marker, ft.getMessage(), ft.getThrowable());
      logEntries.add(new BaleenLogEntry(Level.ERROR, ft, name));
    }
  }

  @Override
  public void error(Marker marker, String msg, Throwable t) {
    if (isErrorEnabled()) {
      logger.error(marker, msg, t);
      logEntries.add(new BaleenLogEntry(Level.ERROR, msg, t, name));
    }
  }
}
