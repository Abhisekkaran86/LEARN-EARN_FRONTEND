import { getUserInitials, getUserProfileImage } from "@/utils/userProfile";

const sizeClasses = {
  xs: "h-8 w-8",
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const textSizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const UserAvatar = ({
  user,
  name,
  src,
  size = "md",
  className = "",
  textClassName = "",
}) => {
  const resolvedName = name || user?.name || "User";
  const imageSrc = src || getUserProfileImage(user);
  const avatarSize = sizeClasses[size] || sizeClasses.md;
  const initialsSize = textSizeClasses[size] || textSizeClasses.md;

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={resolvedName}
        className={`${avatarSize} rounded-2xl object-cover ${className}`.trim()}
      />
    );
  }

  return (
    <div
      className={`${avatarSize} flex items-center justify-center rounded-2xl bg-gradient-to-br from-lime-500 to-emerald-600 font-semibold text-white ${className}`.trim()}
      aria-label={resolvedName}
    >
      <span className={`${initialsSize} ${textClassName}`.trim()}>
        {getUserInitials(resolvedName)}
      </span>
    </div>
  );
};

export default UserAvatar;
