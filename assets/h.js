const session = {
  booking: {
    id: "",
    journeys: [
      {
        origin: "ABV",
        destination: "LOS",
        std: "2022-09-05T11:45:00",
        stdutc: "2022-09-05T10:45:00Z",
        sta: "2022-09-05T13:20:00",
        stautc: "2022-09-05T12:20:00Z",
        duration: "01:35:00",
        referenceId: "Q9~ 301~ ~~ABV~09/05/2022 11:45~LOS~09/05/2022 13:20~~",
        segments: [
          {
            id: "4142567E4C4F537E203330317E51397E323032322D30392D30357E353133393745323033333330333137453230374537453431343235363745333033393246333033353246333233303332333232303331333133413334333537453443344635333745333033393246333033353246333233303332333232303331333333413332333037453745",
            referenceId:
              "Q9~ 301~ ~~ABV~09/05/2022 11:45~LOS~09/05/2022 13:20~~",
            segmentStatus: 1,
            origin: "ABV",
            destination: "LOS",
            std: "2022-09-05T11:45:00",
            stdutc: "2022-09-05T10:45:00Z",
            sta: "2022-09-05T13:20:00",
            stautc: "2022-09-05T12:20:00Z",
            duration: "01:35:00",
            legs: [
              {
                origin: "ABV",
                destination: "LOS",
                originTerminal: "",
                destinationTerminal: "",
                std: "2022-09-05T11:45:00",
                stdutc: "2022-09-05T10:45:00Z",
                sta: "2022-09-05T13:20:00",
                stautc: "2022-09-05T12:20:00Z",
                duration: "01:35:00",
                legInfo: { isSubjectedToGovernmentApproval: false },
              },
            ],
            transport: {
              carrier: { code: "Q9" },
              type: "Plane",
              number: " 301",
            },
            status: "Default",
          },
        ],
        fares: [
          {
            id: "47467E7E4832464F577E48327E4144547E7E33303745343833323745374535313339374534383332343634463537374534363443343535383745374533313745333137453445343134323536344334463533333033303331333033303331333037453538",
            referenceId: "0~H2~~Q9~H2FOW~FLEX~~1~1~NABVLOS0010010~X",
            fareBasisCode: "H2FOW",
            classOfService: "H2",
            productClass: "GF",
            availableSeats: 0,
            paxCode: "ADT",
            promoCode: "",
            serviceBundleCode: "",
            totalAmount: 73500.0,
            charges: [
              { type: "Fare", code: "Fare", amount: 65095.0, currency: "NGN" },
              { type: "Tax", code: "NG", amount: 3255.0, currency: "NGN" },
              { type: "Fee", code: "YQ", amount: 3000.0, currency: "NGN" },
              { type: "Tax", code: "NG", amount: 150.0, currency: "NGN" },
              { type: "Fee", code: "QT", amount: 2000.0, currency: "NGN" },
            ],
          },
        ],
        status: "Confirmed",
        id: "3431343235363745344334463533374532303333333033313745353133393745333233303332333232443330333932443330333537453335333133333339333734353332333033333333333333303333333133373435333233303337343533373435333433313334333233353336333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333133333431333333343333333533373435333434333334343633353333333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333333333431333333323333333033373435333734357E353133393745323033333330333137453230374537453431343235363745333033393246333033353246333233303332333232303331333133413334333537453443344635333745333033393246333033353246333233303332333232303331333333413332333037453745",
      },
    ],
    pax: [
      {
        type: { category: "Adult", code: "ADT" },
        loyaltyNumbers: [],
        segmentsInfo: [
          {
            segmentId:
              "4142567E4C4F537E203330317E51397E323032322D30392D30357E353133393745323033333330333137453230374537453431343235363745333033393246333033353246333233303332333232303331333133413334333537453443344635333745333033393246333033353246333233303332333232303331333333413332333037453745",
            status: "Default",
            seat: "",
            boardingSequence: "",
            extraSeats: [],
          },
        ],
        referenceId: "0^0",
        customerId: "",
        status: "Confirmed",
        id: "6F6C617E7465657E313935342D30322D30327E333035453330",
        name: { title: "MR", first: "ola", middle: "", last: "tee" },
        documents: [],
        personInfo: {
          gender: "Male",
          weight: "Unknown",
          dateOfBirth: "1954-02-02",
          nationality: "",
        },
        channels: [],
      },
    ],
    contacts: [
      {
        type: "Booking",
        mktOption: false,
        id: "4F6C6162616D6970657E746169776F7E426F6F6B696E677E7465656F6C61343840676D61696C2E636F6D",
        name: { title: "MR", first: "Olabamipe", middle: "", last: "taiwo" },
        address: {
          country: "NG",
          province: "",
          city: "Akure",
          zipCode: "",
          addressLine: "Police Lodge",
          addressLine2: "",
        },
        documents: [],
        channels: [
          {
            type: "Email",
            scope: 0,
            info: "teeola48@gmail.com",
            cultureCode: "en-US",
          },
          {
            type: "Phone",
            scope: 0,
            info: "8169871621",
            prefix: "234",
            cultureCode: "en-US",
          },
        ],
      },
    ],
    payments: [],
    services: [
      {
        id: "4932307E317E426167676167657E33343331333433323335333633373435333434333334343633353333333734353332333033333333333333303333333133373435333533313333333933373435333333323333333033333332333333323332343433333330333333393332343433333330333333353337343533333335333333313333333333333339333333373334333533333332333333303333333333333333333333333333333033333333333333313333333733343335333333323333333033333337333433353333333733343335333333343333333133333334333333323333333533333336333333373334333533333333333333303333333333333339333333323334333633333333333333303333333333333335333333323334333633333333333333323333333333333330333333333333333233333333333333323333333233333330333333333333333133333333333333313333333333343331333333333333333433333333333333353333333733343335333333343334333333333334333433363333333533333333333333373334333533333333333333303333333333333339333333323334333633333333333333303333333333333335333333323334333633333333333333323333333333333330333333333333333233333333333333323333333233333330333333333333333133333333333333333333333333343331333333333333333233333333333333303333333733343335333333373334333537453335333133333339333734353332333033333333333333303333333133373435333233303337343533373435333433313334333233353336333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333133333431333333343333333533373435333434333334343633353333333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333333333431333333323333333033373435333734357E3646364336313745373436353635374533313339333533343244333033323244333033323745333333303335343533333330",
        referenceId: "1",
        code: "I20",
        sellKey:
          "3431343235363745344334463533374532303333333033313745353133393745333233303332333232443330333932443330333537453335333133333339333734353332333033333333333333303333333133373435333233303337343533373435333433313334333233353336333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333133333431333333343333333533373435333434333334343633353333333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333333333431333333323333333033373435333734357E353133393745323033333330333137453230374537453431343235363745333033393246333033353246333233303332333232303331333133413334333537453443344635333745333033393246333033353246333233303332333232303331333333413332333037453745",
        paxId: "6F6C617E7465657E313935342D30322D30327E333035453330",
        status: "Pending",
        changeStrategy: "Free",
        type: "Baggage",
        scope: "PerPaxJourney",
      },
    ],
    bookingInfo: {
      referenceId: "0",
      recordLocator: "",
      comments: [],
      queues: [],
      status: "Creating",
      createdDate: "9999-12-31T00:00:00Z",
      pointOfSale: {
        agent: { id: "WebAnonymous" },
        organization: { id: "Q9" },
        channelType: 0,
      },
    },
    pricing: {
      totalAmount: 73500.0,
      balanceDue: 73500.0,
      isBalanced: false,
      currency: "NGN",
      breakdown: {
        perPaxJourney: [
          {
            paxId: "6F6C617E7465657E313935342D30322D30327E333035453330",
            journeyId:
              "3431343235363745344334463533374532303333333033313745353133393745333233303332333232443330333932443330333537453335333133333339333734353332333033333333333333303333333133373435333233303337343533373435333433313334333233353336333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333133333431333333343333333533373435333434333334343633353333333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333333333431333333323333333033373435333734357E353133393745323033333330333137453230374537453431343235363745333033393246333033353246333233303332333232303331333133413334333537453443344635333745333033393246333033353246333233303332333232303331333333413332333037453745",
            referenceId:
              "4932307E317E426167676167657E33343331333433323335333633373435333434333334343633353333333734353332333033333333333333303333333133373435333533313333333933373435333333323333333033333332333333323332343433333330333333393332343433333330333333353337343533333335333333313333333333333339333333373334333533333332333333303333333333333333333333333333333033333333333333313333333733343335333333323333333033333337333433353333333733343335333333343333333133333334333333323333333533333336333333373334333533333333333333303333333333333339333333323334333633333333333333303333333333333335333333323334333633333333333333323333333333333330333333333333333233333333333333323333333233333330333333333333333133333333333333313333333333343331333333333333333433333333333333353333333733343335333333343334333333333334333433363333333533333333333333373334333533333333333333303333333333333339333333323334333633333333333333303333333333333335333333323334333633333333333333323333333333333330333333333333333233333333333333323333333233333330333333333333333133333333333333333333333333343331333333333333333233333333333333303333333733343335333333373334333537453335333133333339333734353332333033333333333333303333333133373435333233303337343533373435333433313334333233353336333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333133333431333333343333333533373435333434333334343633353333333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333333333431333333323333333033373435333734357E3646364336313745373436353635374533313339333533343244333033323244333033323745333333303335343533333330",
            totalAmount: 0.0,
            currency: "NGN",
            charges: [
              { type: "Service", code: "IBAG20", amount: 0.0, currency: "NGN" },
            ],
          },
          {
            paxId: "6F6C617E7465657E313935342D30322D30327E333035453330",
            journeyId:
              "3431343235363745344334463533374532303333333033313745353133393745333233303332333232443330333932443330333537453335333133333339333734353332333033333333333333303333333133373435333233303337343533373435333433313334333233353336333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333133333431333333343333333533373435333434333334343633353333333734353333333033333339333234363333333033333335333234363333333233333330333333323333333233323330333333313333333333333431333333323333333033373435333734357E353133393745323033333330333137453230374537453431343235363745333033393246333033353246333233303332333232303331333133413334333537453443344635333745333033393246333033353246333233303332333232303331333333413332333037453745",
            referenceId:
              "Q9~ 301~ ~~ABV~09/05/2022 11:45~LOS~09/05/2022 13:20~~",
            totalAmount: 73500.0,
            currency: "NGN",
            charges: [
              { type: "Fare", code: "Fare", amount: 65095.0, currency: "NGN" },
              { type: "Tax", code: "NG", amount: 3255.0, currency: "NGN" },
              { type: "Fee", code: "YQ", amount: 3000.0, currency: "NGN" },
              { type: "Tax", code: "NG", amount: 150.0, currency: "NGN" },
              { type: "Fee", code: "QT", amount: 2000.0, currency: "NGN" },
            ],
          },
        ],
      },
    },
    bundles: [],
    etickets: [],
  },
  error: { code: "", description: "", trace: "" },
  success: true,
};
