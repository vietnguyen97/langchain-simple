import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "../config/open-ai.js";

export const template = async () => {
    try {
        const prompt = ChatPromptTemplate.fromTemplate(`
            Bạn là một chuyên gia marketing.
            Hãy viết nội dung quảng cáo cho sản phẩm: {product}
            Đối tượng khách hàng: {audience}
            Giữ giọng văn trẻ trung.
          `);
        const chain = prompt.pipe(model)
        const resp = await chain.invoke({
            product: "Sản phẩm chăm sóc da",
            audience: "Thanh thiếu niên",
        })
        return resp;
    } catch (error) {
        console.error("Error: Template", error);
    }
}