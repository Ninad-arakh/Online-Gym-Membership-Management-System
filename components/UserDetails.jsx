"use client";
import ExpandableCardDemo from "@/components/expandable-card-demo-standard";
import dayjs from "dayjs";

const AdminUsersCards = ({ users }) => {
  const cards = users.map((user) => ({
    title: user.name,
    description: user.email,

    content: (
      <div className="space-y-5 text-sm text-neutral-300">
        {/* Basic Info */}
        <div>
          <p>
            <span className="font-semibold text-white">Joined:</span>{" "}
            {dayjs(user.createdAt).format("DD MMM YYYY")}
          </p>
        </div>

        {/* Memberships */}
        <div>
          <h4 className="text-white font-semibold mb-2">
            Memberships
          </h4>

          {user.memberships.length === 0 && (
            <p className="text-neutral-500">
              No memberships found
            </p>
          )}

          {user.memberships.map((m) => (
            <div
              key={m._id}
              className="border border-white/10 rounded-xl p-4 mb-3"
            >
              <p>
                <span className="font-semibold">Plan:</span>{" "}
                {m.planTitle}
              </p>

              <p>
                <span className="font-semibold">Amount Paid:</span>{" "}
                ₹{m.pricePaid}
              </p>

              <p>
                <span className="font-semibold">Billing:</span>{" "}
                {m.billingCycle}
              </p>

              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={
                    m.status === "active"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {m.status}
                </span>
              </p>

              <p>
                <span className="font-semibold">Purchased:</span>{" "}
                {dayjs(m.startDate).format("DD MMM YYYY")}
              </p>

              <p>
                <span className="font-semibold">Expires:</span>{" "}
                {dayjs(m.endDate).format("DD MMM YYYY")}
              </p>

              {/* Trainer */}
              {m.trainerId && (
                <div className="mt-2">
                  <p className="font-semibold text-white">
                    Trainer Assigned
                  </p>
                  <p>{m.trainerId.name}</p>
                  <p>
                    Experience: {m.trainerId.experienceYears} yrs
                  </p>
                </div>
              )}

              {/* Payment */}
              {m.payment?.paymentId && (
                <div className="mt-2">
                  <p className="font-semibold text-white">
                    Payment
                  </p>
                  <p>Provider: {m.payment.provider}</p>
                  <p>ID: {m.payment.paymentId}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ),

    onAction: () => {
      console.log("Admin action on user:", user._id);
    },
  }));

  return <ExpandableCardDemo cards={cards} isRequestTrainers={false} />;
};

export default AdminUsersCards;
