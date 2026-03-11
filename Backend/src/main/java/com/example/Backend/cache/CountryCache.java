package com.example.Backend.cache;

import com.example.Backend.model.Country;

import java.util.List;

public class CountryCache {

    private static List<Country> cachedCountries;
    private static long lastFetchTime;

    public static List<Country> getCachedCountries() {
        return cachedCountries;
    }

    public static void setCachedCountries(List<Country> countries) {
        cachedCountries = countries;
        lastFetchTime = System.currentTimeMillis();
    }

    public static boolean isExpired() {
        long now = System.currentTimeMillis();
        return (now - lastFetchTime) > 600000; // 10 minutes
    }

}
