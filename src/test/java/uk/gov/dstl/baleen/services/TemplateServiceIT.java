package uk.gov.dstl.baleen.services;

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

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import uk.gov.dstl.baleen.data.EmptyTemplate;
import uk.gov.dstl.baleen.data.PipelineTemplate;

import java.io.*;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestPropertySource(properties = {
  "baleen.templates=test-templates"
})
public class TemplateServiceIT {

  @Autowired
  TemplateService templateService;

  @BeforeEach
  public void before() {
    deleteDirectory(new File("test-templates"));
  }

  @AfterEach
  public void after() {
    deleteDirectory(new File("test-templates"));
  }

  private static boolean deleteDirectory(File directoryToBeDeleted) {
    File[] allContents = directoryToBeDeleted.listFiles();
    if (allContents != null) {
      for (File file : allContents) {
        deleteDirectory(file);
      }
    }
    return directoryToBeDeleted.delete();
  }

  @Test
  public void test() throws IOException {
    //Copy template into test directory
    File templateFolder = new File("test-templates/");
    templateFolder.mkdir();

    copyFile("testTemplate1.json", templateFolder);

    // Initialise - this would usually be done by PostConstruct,
    // but that's already been called before we put the file in the test directory
    // and we want to test that findInitialTemplates() finds the file so we do it again
    templateService.findInitialTemplates();

    // Check there are two templates - the one we added, and the Empty Template default
    List<PipelineTemplate> templates = templateService.getTemplates();

    assertEquals(2, templates.size());
    assertEquals(EmptyTemplate.class, templates.get(0).getClass());
    assertEquals("Test Template 1", templates.get(1).getName());

    // Copy another file and wait until it's been picked up
    copyFile("testTemplate2.json", templateFolder);

    try {
      Thread.sleep(5500); //Watch Service checks for new files every 5 seconds
    }catch (Exception e){
      //Do nothing, although the test may fail
    }

    // Check there are now three templates, which will be in alphabetical order
    templates = templateService.getTemplates();

    assertEquals(3, templates.size());
    assertEquals(EmptyTemplate.class, templates.get(0).getClass());
    assertEquals("Test Template 1", templates.get(1).getName());
    assertEquals("Test Template 2", templates.get(2).getName());

    // Delete both templates and wait until the change is detected
    new File(templateFolder, "testTemplate1.json").delete();
    new File(templateFolder, "testTemplate2.json").delete();

    try {
      Thread.sleep(5500); //Watch Service checks for new files every 5 seconds
    }catch (Exception e){
      //Do nothing, although the test may fail
    }

    // Check there is just one template
    templates = templateService.getTemplates();

    assertEquals(1, templates.size());
    assertEquals(EmptyTemplate.class, templates.get(0).getClass());
  }

  private void copyFile(String filename, File folder) throws IOException{
    try(
      InputStream inStream = this.getClass().getResourceAsStream(filename);
      OutputStream outStream = new FileOutputStream(new File(folder, filename))
    ){
      byte[] buffer = new byte[inStream.available()];
      inStream.read(buffer);

      outStream.write(buffer);
      outStream.flush();
    }
  }
}
