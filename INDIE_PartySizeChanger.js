/*:
* @plugindesc Changes the party size dynamically using the PartyMembers plugin command.
* @author Soczó Kristóf
*
* @help
* This plugin allows you to change the party size dynamically.
*
* Plugin Command:
* PartyMembers x - Sets the party size to x.
*
* @param PartySizeVar
* @text Party Size Variable
* @type variable
* @desc select which variable you want to track.
*
* @param StarterPartySize
* @text Starter Party Size
* @type number
* @default 1
* @desc select the starter party size.
 */

(function() {
    var parameters = PluginManager.parameters('INDIE_PartySizeChanger');
    var partySizeVar = Number(parameters['PartySizeVar'] || 0);
    var starterPartySize = Number(parameters['StarterPartySize'] || 1);

    var _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.call(this);
        this._maxBattleMembers = starterPartySize;
    };

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === 'PartyMembers') {
            var partySize = Number(args[0]);
            this._maxBattleMembers = partySize;

            // Update the chosen variable value
            if (partySizeVar !== 0) {
                $gameVariables.setValue(partySizeVar, partySize);
            }
        }
    };

    Game_Party.prototype.setMaxBattleMembers = function(maxBattleMembers) {
        this._maxBattleMembers = maxBattleMembers;
    };

    var _Game_Party_maxBattleMembers = Game_Party.prototype.maxBattleMembers;
    Game_Party.prototype.maxBattleMembers = function() {
        if (this._maxBattleMembers !== undefined) {
            return this._maxBattleMembers;
        } else {
            return _Game_Party_maxBattleMembers.call(this);
        }
    };
})();

