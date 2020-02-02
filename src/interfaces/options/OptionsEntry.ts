export default interface SaveStorageEntry {
  load(): Promise<void>;
  save(): Promise<void>;
}
