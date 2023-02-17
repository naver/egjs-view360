import { Projection } from "../View360";

class ProjectionData {
  constructor(
    public projection: string,
    public projectionOptions: Record<string, any>
  ) {}
}

export default ProjectionData;
