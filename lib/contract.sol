// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationContract {
  struct Donation {
    uint256 id;
    string donorName;
    string ngoName;
    string donatedItemName;
    uint256 donatingDate;
    uint256 donatedItemQuantity;
  }

  uint256 private nextDonationId;
  mapping(uint256 => Donation) public donations;
  uint256[] public donationIds;

  event DonationAdded(uint256 id, string donorName, string ngoName, string donatedItemName, uint256 donatingDate, uint256 donatedItemQuantity);

  function addDonation(string memory _donorName, string memory _ngoName, string memory _donatedItemName, uint256 _donatingDate, uint256 _donatedItemQuantity) public {
    uint256 donationId = nextDonationId++;

    donations[donationId] = Donation(donationId, _donorName, _ngoName, _donatedItemName, _donatingDate, _donatedItemQuantity);
    donationIds.push(donationId);

    emit DonationAdded(donationId, _donorName, _ngoName, _donatedItemName, _donatingDate, _donatedItemQuantity);
  }

  function getDonation(uint256 _donationId) public view returns (uint256, string memory, string memory, string memory, uint256, uint256) {
    Donation memory donation = donations[_donationId];
    return (donation.id, donation.donorName, donation.ngoName, donation.donatedItemName, donation.donatingDate, donation.donatedItemQuantity);
  }

  function getAllDonations() public view returns (Donation[] memory) {
    Donation[] memory allDonations = new Donation[](donationIds.length);

    for (uint256 i = 0; i < donationIds.length; i++) {
      allDonations[i] = donations[donationIds[i]];
    }

    return allDonations;
  }
}
