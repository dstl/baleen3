package uk.gov.dstl.baleen.utils;

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

import io.annot8.api.pipelines.NoOpOrderer;
import io.annot8.api.pipelines.PipelineOrderer;
import uk.gov.dstl.baleen.exceptions.BadRequestException;
import uk.gov.dstl.baleen.exceptions.ComponentNotFoundException;

public class Annot8Utils {
  public static PipelineOrderer getOrderer(String ordererClass){
    //Special case for NoOpOrderer, as it is a singleton
    if(NoOpOrderer.class.getName().equals(ordererClass))
      return NoOpOrderer.getInstance();

    try {
      Class<? extends PipelineOrderer> clazz = (Class<? extends PipelineOrderer>) Class.forName(ordererClass);
      return clazz.getConstructor().newInstance();
    }catch (ClassNotFoundException e) {
      throw new ComponentNotFoundException(ordererClass);
    }catch (ClassCastException e){
      throw new BadRequestException("Class is not an instance of PipelineOrderer");
    }catch (NoSuchMethodException e){
      throw new BadRequestException("Unable to instantiate Orderer - must have a no argument constructor");
    }catch (Exception e){
      throw new BadRequestException("Unable to instantiate Orderer", e);
    }
  }
}
