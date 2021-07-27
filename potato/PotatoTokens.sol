// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./AccessControl.sol";
import "./ERC1155.sol";
import "./ERC1155Burnable.sol";

contract PotatoTokens is AccessControl, ERC1155Burnable {
    address public owner;
    struct NFT {
        bool minted;
        bool sleeve;
        uint256 damage;
    }
    mapping(uint256 => NFT) public nfts;
    uint256 public constant NON_FUNGIBLE_START = 10000000;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() public
        ERC1155("json link")
    {
        owner = msg.sender;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    function mintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) public virtual {
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "Not minter"
        );
        for (uint256 i = 0; i < _ids.length; i++) {
            if(_ids[i] >= NON_FUNGIBLE_START){
                require(!nfts[_ids[i]].minted, "Already minted");
                require(_amounts[i] == 1, "Amount over 1");
                nfts[_ids[i]].preserve = true;
                nfts[_ids[i]].minted = true;
            }
        }
        _mintBatch(_to, _ids, _amounts, _data);
    }

    function mint(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) public virtual {
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "Not minter"
        );
        if(_id >= NON_FUNGIBLE_START){
            require(!nfts[_id].minted, "Already minted");
            require(_amount == 1, "Amount over 1");
            nfts[_id].minted = true;
            nfts[_id].sleeve = true;
        }
        _mint(_to, _id, _amount, _data);
    }

    function _beforeTokenTransfer(
        address _operator,
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) internal virtual override(ERC1155) {
        super._beforeTokenTransfer(_operator, _from, _to, _ids, _amounts, _data);
        for (uint256 i = 0; i < _ids.length; i++) {
            //don't include fungible tokens
            if (_ids[i] < NON_FUNGIBLE_START) continue;
            if(_from != address(0)) removeSleeve(_ids[i]);
        }
    }

    function preserveBatch(uint256[] calldata _ids) external {
        uint256 burnPreserve = _ids.length;
        for (uint256 i = 0; i < _ids.length; i++) {
            if (nfts[_ids[i]].preserve) {
                //already preserve
                burnPreserves -= 1;
                continue;
            }
            uint256 cardBalance = balanceOf(msg.sender, _ids[i]);
            require(cardBalance > 0, "Not owned");
            require(_ids[i] >= NON_FUNGIBLE_START);
            nfts[_ids[i]].preserve = true;
        }
        _burn(msg.sender, 1, burnPreserves);
    }

    function preserve(uint256 _id) external {
        require(!nfts[_id].preserve, "Already preserved");
        uint256 cardBalance = balanceOf(msg.sender, _id);
        require(
            cardBalance > 0,
            "Not owned"
        );
        require(_id >= NON_FUNGIBLE_START);
        nfts[_id].preserve = true;
        _burn(msg.sender, 1, 1);
    }

    function removePreserve(uint256 _id) private {
        if (!nfts[_id].preserve) {
            nfts[_id].damage += 1;
        }
        else{
            nfts[_id].preserve = false;
        }
    }

    function contractURI() public pure returns (string memory) {
        return "https://tokens.com/api";
    }

    function getDamage(uint256 _id) public view returns (uint256) {
        return nfts[_id].damage;
    }

    function isPreserved(uint256 _id) public view returns (bool) {
        return nfts[_id].preserve;
    }
}