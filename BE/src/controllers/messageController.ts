import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Message from "../models/messageModel";
import { sendMail } from "../services/emailServices";
import { generateMailTemplate } from "../templates/mails";

export const sendContacUsMessage = catchAsync(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, message } = req.body;
    const payload = { firstName, lastName, email, message };
    await Message.create(payload);
    await sendMail({
      to: [email],
      subject: req.t("MAILS.TITLE.CONTACT_US"),
      html: generateMailTemplate({
        title: req.t("MAILS.TITLE.CONTACT_US"),
        user: `${firstName} ${lastName}`,
        actionTitle: req.t("MAILS.ACTION_TITLE.CONTACT_US"),
        actionSubtitle: req.t("MAILS.ACTION_SUBTITLE.CONTACT_US"),
        content: req.t("MAILS.CONTENT.CONTACT_US"),
        actionLink: process?.env?.CLIENT_URL ?? "",
      }),
    });
    res.status(200).json({
      status: "success",
    });
  }
);
