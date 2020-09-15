import {getListener} from "../../server/main";
import {NextApiRequest, NextApiResponse} from "next";

export default (req: NextApiRequest, res: NextApiResponse) => new Promise(async resolve => {
    const listener = await getListener();
    listener(req, res);
    res.on("finish", resolve);
})
