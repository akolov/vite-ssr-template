import { ClientRequest, RequestOptions } from "agent-base"
import { HttpsProxyAgent, HttpsProxyAgentOptions } from "https-proxy-agent"
import { Socket } from "net"


export class PatchedHttpsProxyAgent extends HttpsProxyAgent {

  private extraOpts: HttpsProxyAgentOptions

  constructor(opts: HttpsProxyAgentOptions) {
    super(opts)
    this.extraOpts = opts
  }

  async callback(req: ClientRequest, opts: RequestOptions): Promise<Socket> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return super.callback(req, { ...this.extraOpts as any, ...opts })
  }

}
