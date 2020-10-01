package uk.gov.dstl.baleen.data;

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

import org.junit.jupiter.api.Test;
import uk.gov.dstl.annot8.TestAnnotationlessProcessor;
import uk.gov.dstl.annot8.TestProcessor;
import uk.gov.dstl.annot8.TestSettings;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class Annot8ComponentInfoTest {

  @Test
  public void testName() {
    Annot8ComponentInfo info = new Annot8ComponentInfo();

    assertNull(info.getName());

    info.setName("TEST");
    assertEquals("TEST", info.getName());
  }

  @Test
  public void testDescription() {
    Annot8ComponentInfo info = new Annot8ComponentInfo();

    assertNull(info.getDescription());

    info.setDescription("TEST");
    assertEquals("TEST", info.getDescription());
  }

  @Test
  public void testArtifact() {
    Annot8ComponentInfo info = new Annot8ComponentInfo();

    assertNull(info.getArtifact());

    info.setArtifact("TEST.jar");
    assertEquals("TEST.jar", info.getArtifact());
  }

  @Test
  public void testComponentClass() {
    Annot8ComponentInfo info = new Annot8ComponentInfo();

    assertNull(info.getComponentClass());

    info.setComponentClass("this.is.my.Class");
    assertEquals("this.is.my.Class", info.getComponentClass());
  }

  @Test
  public void testSettingsClass() {
    Annot8ComponentInfo info = new Annot8ComponentInfo();

    assertNull(info.getSettingsClass());

    info.setSettingsClass("this.is.my.Class");
    assertEquals("this.is.my.Class", info.getSettingsClass());
  }

  @Test
  public void testTags() {
    Annot8ComponentInfo info = new Annot8ComponentInfo();

    assertNull(info.getTags());

    info.setTags(List.of("test", "test2"));
    assertEquals(List.of("test", "test2"), info.getTags());
  }

  @Test
  public void testFilenameToComponent() {
    assertEquals("foo-bar", Annot8ComponentInfo.filenameToComponent("foo-bar-1.0.2.jar"));
    assertEquals("Unpackaged", Annot8ComponentInfo.filenameToComponent("/tmp/files"));
    assertEquals(
        "foo-bar", Annot8ComponentInfo.filenameToComponent("file:/tmp/files/foo-bar-1.0.2.jar!/"));
    assertEquals("foo-bar", Annot8ComponentInfo.filenameToComponent("foo-bar-1.0.3-SNAPSHOT.jar"));
    assertEquals("foo-bar", Annot8ComponentInfo.filenameToComponent("foo-bar-1.0.3-SNAPSHOT-shaded.jar"));

  }

  @Test
  public void testFromDescriptor() {
    Annot8ComponentInfo info = Annot8ComponentInfo.fromDescriptor(TestProcessor.class);

    assertEquals("Test Processor", info.getName());
    assertEquals("Processor for testing, does not do anything any items", info.getDescription());
    assertEquals(List.of("test"), info.getTags());
    assertNotNull(info.getArtifact());
    assertEquals(TestProcessor.class.getName(), info.getComponentClass());
    assertEquals(TestSettings.class.getName(), info.getSettingsClass());
  }

  @Test
  public void testFromDescriptorNoAnnotations() {
    Annot8ComponentInfo info = Annot8ComponentInfo.fromDescriptor(TestAnnotationlessProcessor.class);

    assertNull(info.getName());
    assertNull(info.getDescription());
    assertNull(info.getTags());
    assertNotNull(info.getArtifact());
    assertEquals(TestAnnotationlessProcessor.class.getName(), info.getComponentClass());
    assertNull(info.getSettingsClass());
  }
}
