package uk.gov.dstl.annot8.baleen;

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
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

public class RestApiQueueTest {
  @Test
  public void test(){
    RestApiQueue queue = new RestApiQueue();
    assertTrue(queue.isEmpty());

    SubmittedData data1 = Mockito.mock(SubmittedData.class);
    queue.addToQueue(data1);
    assertFalse(queue.isEmpty());

    SubmittedData data2 = Mockito.mock(SubmittedData.class);
    queue.addToQueue(data2);

    SubmittedData data3 = Mockito.mock(SubmittedData.class);
    queue.addToQueue(data3);

    Optional<SubmittedData> opt1 = queue.readFromQueue();
    assertTrue(opt1.isPresent());
    assertEquals(data1, opt1.get());
    assertFalse(queue.isEmpty());

    Optional<SubmittedData> opt2 = queue.readFromQueue();
    assertTrue(opt2.isPresent());
    assertEquals(data2, opt2.get());
    assertFalse(queue.isEmpty());

    Optional<SubmittedData> opt3 = queue.readFromQueue();
    assertTrue(opt3.isPresent());
    assertEquals(data3, opt3.get());
    assertTrue(queue.isEmpty());

    Optional<SubmittedData> optEmpty = queue.readFromQueue();
    assertFalse(optEmpty.isPresent());
  }
}
