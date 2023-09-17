import { create } from "zustand";

export const useKYCVerified = create((set) => {
  return {
    verificationId: "",
    setVerificationId: (verificationId) => set({ verificationId }),
    status: {
      bvn: "",
      sms: "",
    },
    setStatus: (status) => set({ status }),
    phoneNumber: "",
    setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
    loading: true,
    setLoading: (loading) => set({ loading }),
    kycVerified: false,
    setKYCVerified: (kycVerified) => set({ kycVerified }),
    dailyLimit: 0,
    setDailyLimit: (dailyLimit) => set({ dailyLimit }),
  };
});
