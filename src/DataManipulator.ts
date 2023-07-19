import { ServerRespond } from './DataStreamer';

export interface Row {
        price_abc: number,
        price_def: number,
        ratio: number,
        upper_bound: number,
        lower_bound: number,
        trigger_alert:number | undefined,
        timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceabc = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price)/2;
    const pricedef = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price)/2;
    const ratio = priceabc/pricedef;
    const upperBound = 1 + 0.02;
    const lowerBound = 1 - 0.02;
    return {
        price_abc: priceabc,
        price_def:pricedef,
        ratio,
        timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      };
    }
}
