import { XhrContext } from "../models/xhr-context";

export abstract class AbstractRequestFilter  {

    abstract onRequest: (context: XhrContext) => void;

    onRequestExecuting: (context: XhrContext) => void;

}