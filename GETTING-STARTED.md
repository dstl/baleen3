# Getting Started with Baleen 3

This document provides a brief walkthrough of setting up Baleen 3 and creating your first pipeline.
It is intended to get you started with Baleen 3 quickly, without going in to too much technical detail.

If you just want to get a pipeline up and running without learning about what is happening, you can just follow the numbered bullet points.

## What is Baleen 3?

Baleen 3 is a tool for configuring and managing data processing pipelines.
A data processing pipeline is a process that takes data (potentially from multiple sources) and performs some sort of processing on it.
For example, it might extract e-mail addresses from text, or identify faces in an image.

Baleen 3 is built on top of the [Annot8](https://github.com/annot8) data processing framework, which means any components written for that framework can be used within Baleen.

## Downloading Baleen 3

First, we need to download a copy of Baleen 3.

The easiest way to do this is to download a pre-built version from the [Releases](https://github.com/dstl/baleen3/releases) page.
You should download the file called `baleen-3.0.0.jar`, as this is the main JAR file (i.e. application) for Baleen 3.

1. Navigate to the [GitHub Releases page for Baleen 3](https://github.com/dstl/baleen3/releases)
2. Download `baleen-3.0.0.jar` from the Assets section
3. Create a new folder, which we will refer to as `$BALEEN_HOME` and save the downloaded JAR file to it

Alternatively, you could build Baleen 3 yourself from source.
For instructions on how to do this, refer to the [README.md](README.md) file.

## Downloading Annot8 Components

Baleen 3 is a little different to previous versions of Baleen, in that the data processing components (i.e. the Sources, which read data, and the Processors, which process it) are not included with Baleen.
Instead, you have to download these separately and place them somewhere Baleen 3 can find them.
This approach makes it much easier to include Sources and Processors from a number of different providers, and easier to add new functionality to Baleen 3.

Baleen 3 is built on top of the [Annot8](https://github.com/annot8) data processing framework, and so we need to download some Annot8 components.
There are a number of components made available within the [Annot8 Components](https://github.com/annot8/annot8-components) project, and made available through other sources (e.g. via the Dstl Annot8 Components project).

Each provider may make their components available for download through different routes.
For this example, we will download the *Annot8 Cyber Components* and *Annot8 Print Components* JARs from Maven Central, which is where the official Annot8 components are released.

1. Navigate to the [GitHub Releases page for Annot8 Components](https://github.com/annot8/annot8-components/releases)
2. Download the JAR files for Annot8 Cyber Components (`annot8-components-cyber-1.0.0-plugin.jar`) and Annot8 Print Components (`annot8-components-print-1.0.0-plugin.jar`)
3. Place the JAR files you just downloaded in `$BALEEN_HOME/components/` (you will need to create this directory)

## Running Baleen 3

Baleen 3 runs as a background server. We start it via the Terminal or Command Prompt, but then interact with it via a web browser.
Baleen 3 has been developed with modern web browsers in mind, so we recommend using a recent version of Chrome.

1. Open a terminal and run the following command from the `$BALEEN_HOME` directory: `java -jar baleen-3.0.0.jar`
2. Open a web browser, and navigate to [http://localhost:6413](http://localhost:6413)

## Building a Pipeline

Pipelines in Baleen 3 are built via the Pipeline Editor in your web browser.
The Pipeline Editor lets you create new pipelines by chaining together and configuring Annot8 components.
Once you have created a pipeline, it is then run within Baleen and saved so that it will automatically run next time you start Baleen.
They can also be shared, so that other people (with the same components available) can also run your pipeline.

1. Click the New Pipeline button at the top of the screen
2. Select Empty Pipeline, and then click Use Template to create a new empty pipeline in the Pipeline Editor
3. Give the pipeline a name by clicking the pencil icon next to the default "Empty Pipeline" name
4. Give the pipeline a description by clicking the pencil icon next to the pipeline description (under the name)

### Adding a Source

A source is where a pipeline gets its data from.
A pipeline can have multiple sources, and there are sources available that will read from a variety of data sources (for example, a folder on a disk or a database).

Note that sources are generally only responsible for "finding" the data.
So a source that reads files from a folder would need to be paired with a processor that extracted text (for example) from that file before you could process that text.

We will add the REST API Source to our pipeline, so that we can submit data to our pipeline via the REST API built in to Baleen.

1. Click the Add Source button in the top toolbar, or the large arrow underneath the Sources heading
2. Click the Baleen 3 REST API (a tick will appear to show it's selected), and then click the Select button

### Adding a Processor

A processor is the component of a pipeline that manipulates and processes data.
There are a wide range of processors available, and generally your pipeline will consist of a number of these.

The order that processors run within a pipeline is important, as some processors may rely on the actions or outputs of other processors in order to function.
A pipeline will always be run in the order displayed, but you can change this order within the editor.
You can also download special "Orderer" components which will help you order a pipeline optimally, but this is not covered here.

We're going to add two processors to our pipeline to extract e-mail addresses and print them to the log.

1. Click the Add Processor button in the top toolbar, or the large arrow underneath the Processors heading
2. Click the E-mail and Print Spans processors (both will get ticks), and then the Select button
3. You will see both processors have been added, and the Print Spans processor is telling you that it hasn't been configured.
4. Hover over the Print Spans processor, and click the Cog icon to show the configuration options for that processor
5. Accept the default configuration and click the Save button.
6. You can reorder the processors by dragging and dropping them, although in this case the order won't make a difference.

### Saving the Pipeline

Once you have configured your pipeline, you need to save it before it will start running.

1. Click the Save button at the top of the screen
2. This will save the pipeline in `$BALEEN_HOME/pipelines` as well as start the pipeline running

## Testing the Pipeline 

We can now try submitting some data to the pipeline and confirm it is working.
If everything is configured as above, we should expect to see e-mail addresses extracted from text submitted to the REST API, and printed in the Log

1. In the Submit Data box (which appears for pipelines that are configured to support the Baleen 3 REST API), ensure that the Type is set to Text, and enter `Bob's e-mail address is bob@example.com, but he sometimes uses bob123@example.com.` into the text area.
2. Click the Submit button to send the data via the REST API
3. Click the Logs button in the top toolbar to switch to the Logs view, and scroll to the bottom
4. Examine the log to see that `bob@example.com` and `bob123@example.com` have both been extracted

## Stopping Baleen 3

Once you're done with Baleen 3 and no longer want the server running, you can stop it from the command line.
Note that whilst pipeline configuration is persisted to disk, the state of the pipeline isn't (e.g. items that it's already processed).

1. In the terminal window in which Baleen is running, press `Ctrl + C` to shut down Baleen 3.  

## What Next?

So that's it for our brief introduction to Baleen 3. We have downloaded Baleen 3 and two Annot8 components, created our first pipeline, and used Baleen to extract some e-mail addresses from text.

Of course, what we've seen here is a very simple example of what Baleen 3 and Annot8 can do, and much more complex pipelines are possible.
For example, you could extract images and text from Word Documents submitted via the REST API, perform OCR on the images so you have text from those as well as the document text, and then extract entities mentioned in any of the text.
Or you could process a folder of files on a hard drive, looking for anything that might be an address and save this to a database for use with other tools. 

Now it's over to you to build your own pipelines using the wide range of Annot8 components available. 
For more information on using Baleen 3, please refer to the built in Help page, or the Wiki and Documentation available on the [Baleen 3 GitHub repository](https://github.com/dstl/baleen3).