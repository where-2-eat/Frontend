export type Login_ = {
  userName?: string;
  password?: string;
};

export type SystemUser_ = {
  userId?: string;
  firstName?: string;
  lastName?: string;

  jwt?: string;

  loginInformation?: Login_;
  userPreferences?: UserPreference_;
  userGroups?: UserGroup_[];
  userGroup?: UserGroup_[];
  userLocation?: Location_;
};

export type UserPreference_ = {
  foodRestriction?: string[];
  restaurantType?: string[];

  user?: SystemUser_;
};

export type UserGroup_ = {
  groupName?: string;

  admin?: SystemUser_;
  user?: SystemUser_[];
  suggestions?: Restaurant_[];
  top3Restaurants?: Restaurant_[];
  groupLocation?: Location;
  finalChoice?: Restaurant_;
};

export type Location_ = {
  locationId?: string;
  longitude?: number;
  latitude?: number;

  user?: SystemUser_;
};

export type Restaurant_ = {
  restaurantId?: string;
  restaurantName?: string;
  phoneNumber?: string;
  address?: string;
  zipcode?: string;

  group1?: SystemUser_[];
  group2?: SystemUser_[];
  group3?: SystemUser_[];
  restaurantPreferences?: UserPreference_;
  restaurantLocation?: Location_;
};
