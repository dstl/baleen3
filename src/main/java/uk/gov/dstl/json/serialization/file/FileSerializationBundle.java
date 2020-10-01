package uk.gov.dstl.json.serialization.file;

import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import uk.gov.dstl.json.serialization.SerializationBundle;

import java.io.File;

public class FileSerializationBundle implements SerializationBundle {
  @Override
  public Class<?> getType() {
    return File.class;
  }

  @Override
  public JsonSerializer<?> getSerializer() {
    return null;
  }

  @Override
  public JsonDeserializer<?> getDeserializer() {
    return null;
  }

  @Override
  public Class<?> getTransformedType() {
    return String.class;
  }
}
