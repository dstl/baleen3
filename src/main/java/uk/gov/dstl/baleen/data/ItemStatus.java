package uk.gov.dstl.baleen.data;

public enum ItemStatus {
  QUEUED,
  PROCESSING,
  PROCESSED_OK,
  PROCESSED_ITEM_ERROR,
  PROCESSED_PROCESSOR_ERROR,
  NOT_FOUND,
  UNKNOWN
}
