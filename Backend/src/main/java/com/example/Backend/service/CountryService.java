package com.example.Backend.service;

import com.example.Backend.cache.CountryCache;
import com.example.Backend.model.Country;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class CountryService {

    public List<Country> getCountries() {

        if (CountryCache.getCachedCountries() != null && !CountryCache.isExpired()) {
            return CountryCache.getCachedCountries();
        }

        RestTemplate restTemplate = new RestTemplate();

//        Object[] response = restTemplate.getForObject(
//                "https://restcountries.com/v3.1/all",
//                Object[].class
//        );

        Object[] response = restTemplate.getForObject(
                "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags",
                Object[].class
        );

        List<Country> countries = new ArrayList<>();

        for (Object obj : response) {

            Map map = (Map) obj;

            Map nameMap = (Map) map.get("name");
            List capitalList = (List) map.get("capital");
            Map flags = (Map) map.get("flags");

            String name = nameMap.get("common").toString();

            String capital = "";
            if (capitalList != null && !capitalList.isEmpty()) {
                capital = capitalList.get(0).toString();
            }

            String region = map.get("region").toString();
            Long population = Long.parseLong(map.get("population").toString());
            String flag = flags.get("png").toString();

            countries.add(new Country(name, capital, region, population, flag));
        }

        CountryCache.setCachedCountries(countries);

        return countries;
    }

    public List<Country> searchCountries(String keyword) {

        List<Country> countries = getCountries();

        List<Country> result = new ArrayList<>();

        for (Country c : countries) {

            if (c.getName().toLowerCase().contains(keyword.toLowerCase())) {
                result.add(c);
            }

        }

        return result;
    }
}