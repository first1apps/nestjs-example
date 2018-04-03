
- Person (Type)
    - title
    - firstName
    - middleName
    - lastName
    - suffix
    - gender
    - birthDate
    - socialSecurityNumber
    - maritalStatus
    - homePhoneNumber
    - workPhoneNumber
    - email
    - address (Address)

- Patient
    - id
    - ... (Person)

- Address (type)
    - street1
    - street2
    - city
    - state
    - postalCode
    - country

- Coverage
    - id
    - patientId
    - matchingPayer
    - memberIdNumber
    - groupIdNumber
    - subscriber (Person)
    - relationship

