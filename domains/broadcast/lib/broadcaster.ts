import { Server, Namespace } from "socket.io";
import Session from "./session";
import Event from "./event";

class Broadcaster {
  private readonly sessions = new Map<string, Session>();

  private readonly namespace: Namespace;

  constructor(private readonly io: Server, private readonly name: string) {
    this.io = io;
    this.namespace = io.of(name);

    this.namespace.on("connection", (socket) => {
      const session: Session = { id: socket.id };
      this.sessions.set(session.id, session);

      socket.on("disconnect", () => {
        this.sessions.delete(session.id);
      });
    });
  }

  broadcast(event: Event): boolean {
    const { name, ...others } = event;
    return this.io.to(this.name).emit(name, others);
  }

  getSession(id: string): Session | undefined {
    return this.sessions.get(id);
  }
}

export default Broadcaster;
