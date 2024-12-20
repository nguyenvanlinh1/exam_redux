import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Dog {
    id: string,
    type: string
    attributes: {
        name: string,
        description: string,
        hypoallergenic: false,
        female_weight: {
            min: number,
            max: number
        }
        male_weight: {
            min: number,
            max: number
        }
        life: {
            min: number,
            max: number
        }
    }
}

interface Link {
    current: string,
    last: string,
    next: string,
    self: string
}

type DogResponse = { data: Dog[], link: Link };
type DetailDogResponse = { data: Dog, link: Link };


export const dogApi = createApi({
    reducerPath: "dogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dogapi.dog/api/v2",
        prepareHeaders(headers, ) {
            headers.set("Content-Type", "application/json")
            return headers;
        },
    }),
    tagTypes: ["Dog"],
    endpoints: (build) => ({
        getDogs: build.query<DogResponse, void>({
            query: () => "/breeds",
            providesTags: (result) =>
                Array.isArray(result) && result ? [...result.map((item) => (
                    { type: "Dog", id: item.dogId } as const)),
                { type: "Dog", id: "LIST" }] : [{ type: "Dog", id: "LIST" }],
        }),
        getDog: build.query<DetailDogResponse, string>({
            query: (id) => ({ url: `/breeds/${id}` }),
            providesTags: (_result, _error, id) => [{ type: "Dog", id: id }]
        }),
    })
})

export const { useGetDogsQuery, useGetDogQuery } = dogApi