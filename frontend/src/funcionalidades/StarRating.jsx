import React from "react";

const StarRating = ({ value = 0, max = 5, size = 24, interactive = false, onClick }) => {
  const normalized = Math.min(Math.max(value, 0), max);

  return (
    <div
      className="star-rating"
      style={{ ["--star-size"]: `${size}px` }}
      aria-hidden={interactive ? "false" : "true"}
    >
      {Array.from({ length: max }, (_, i) => {
        const fillPercentage = Math.min(Math.max(normalized - i, 0), 1);

        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`star ${interactive ? "interactive" : ""}`}
            onClick={() => interactive && onClick && onClick(i + 1)}
            role={interactive ? "button" : "img"}
            aria-label={`${i + 1} estrela${i + 1 > 1 ? "s" : ""}`}
          >
            <defs>
              <linearGradient id={`grad-${i}-${value}`}>
                <stop offset={`${fillPercentage * 100}%`} stopColor="#ffd000" />
                <stop offset={`${fillPercentage * 100}%`} stopColor="lightgray" />
              </linearGradient>
            </defs>
            <path
              d="M12 .587l3.668 7.568L24 9.753l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.6 0 9.753l8.332-1.598z"
              fill={`url(#grad-${i}-${value})`}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
