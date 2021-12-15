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

import io.annot8.api.components.Resource;

import java.util.LinkedList;
import java.util.Optional;

/**
 * In-memory queue to hold data submitted via REST API
 */
public class RestApiQueue implements Resource{
  private final LinkedList<SubmittedData> queue = new LinkedList<>();

  /**
   * Add data to the queue
   */
  public void addToQueue(SubmittedData data){
    queue.add(data);
  }

  /**
   * Read the first item in the queue if present, otherwise return an empty Optional
   */
  public Optional<SubmittedData> readFromQueue(){
    if(queue.isEmpty())
      return Optional.empty();

    return Optional.of(queue.removeFirst());
  }

  /**
   * Returns true if there are no items in the queue
   */
  public boolean isEmpty(){
    return queue.isEmpty();
  }

  /**
   * Returns true if the specified ID is present in the queue
   */
  public boolean inQueue(String id) {
    if(id == null)
      return false;

    return queue.stream()
      .anyMatch(sd -> sd.getId().filter(s -> s.equals(id)).isPresent());
  }
}
