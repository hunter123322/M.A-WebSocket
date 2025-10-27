import mongoose, { Schema, Document, Model } from "mongoose";
import type { NotificationType } from "../../types/notificaton/notification.type";
import type { User } from "../../types/User.type";

type NotificationDoc = NotificationType & Document;

const userSubSchema = new Schema<User>(
    {
        id: { type: Number, required: true, trim: true },
        username: { type: String, required: true, trim: true },
        avatarUrl: { type: Number, required: true, trim: true },
    },
    { _id: false }
);

const notificationSchema = new Schema<NotificationDoc>(
    {
        userID: { type: Number, required: true, index: true },
        engagementID: { type: String, required: true },
        actor: { type: userSubSchema, required: true },
        categories: {
            type: String,
            enum: ["comment", "post", "mention", "like", "follow", "system"],
            default: "system", required: true,
        },
        content: { type: String, trim: true },
        read: { type: Boolean, default: false, index: true }
    },
    {
        timestamps: true,
    }
);

export const NotificationModel: Model<NotificationDoc> =
    mongoose.models.Notification || mongoose.model<NotificationDoc>(
        "Notification", notificationSchema
    );
