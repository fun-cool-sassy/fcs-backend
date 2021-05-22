import Event from "./event";

class ResourceEvent implements Event {
  constructor(
    readonly name: "create" | "update" | "delete",
    private readonly resource: string
  ) {}
}

export default ResourceEvent;
