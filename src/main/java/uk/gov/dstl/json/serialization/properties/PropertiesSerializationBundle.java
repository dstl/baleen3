package uk.gov.dstl.json.serialization.properties;

import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import uk.gov.dstl.json.serialization.SerializationBundle;

import java.util.Map;
import java.util.Properties;

public class PropertiesSerializationBundle implements SerializationBundle {
  @Override
  public Class<?> getType() {
    return Properties.class;
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
    return Map.class;
  }
}
